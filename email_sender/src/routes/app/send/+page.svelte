<script lang="ts">
  import { onMount } from "svelte";

  let excelFile: File | null = null;
  let htmlTemplate: File | null = null;

  let smtpConfigs: Array<any> = [];
  let selectedConfigId: string | null = null;

  let subject = "";
  let htmlContent = "";

  let sendRange = "all";
  let firstN = 50;
  let rangeFrom = 1;
  let rangeTo = 100;

  let useBatch = false;
  let batchSize = 20;
  let batchDelay = 60;
  let emailDelay = 45;

  let scheduleEmail = false;
  let scheduledTime: string = "";
  let notifyEmail = "";
  let notifyBrowser = false;

  let delay = 20;

  let contactsPreview: any[] = [];
  let totalContacts = 0;

  // Fetch user's SMTP configurations
  async function fetchSMTPConfigs() {
    try {
      const res = await fetch("/config/smtp");
      const json = await res.json();
      if (json.success) {
        smtpConfigs = json.userConfigs || [];
        selectedConfigId =
          json.userConfigs?.find((c: any) => c.isDefault)?.id || null;
      }
    } catch (error) {
      console.error("Failed to load SMTP configs:", error);
    }
  }

  onMount(fetchSMTPConfigs);

  function handleExcelChange(e: Event) {
    const input = e.target as HTMLInputElement;
    excelFile = input.files?.[0] || null;
    if (excelFile) previewExcel();
  }

  function handleHTMLTemplateChange(e: Event) {
    const input = e.target as HTMLInputElement;
    htmlTemplate = input.files?.[0] || null;
  }

  async function previewExcel() {
    if (!excelFile) return;
    const form = new FormData();
    form.append("excelFile", excelFile);

    const res = await fetch("/parse-excel", {
      method: "POST",
      body: form,
    });
    const json = await res.json();
    if (json.success) {
      contactsPreview = json.contacts || [];
      totalContacts = json.totalCount || 0;
    }
  }

  async function sendEmails() {
    if (!selectedConfigId) return alert("Select SMTP config");
    if (!excelFile) return alert("Upload Excel file");
    if (!subject) return alert("Enter email subject");
    if (!htmlContent && !htmlTemplate) return alert("Email content required");

    const form = new FormData();
    form.append("configId", selectedConfigId);
    form.append("subject", subject);
    form.append("delay", delay.toString());
    form.append("useBatch", useBatch ? "on" : "");
    form.append("batchSize", batchSize.toString());
    form.append("batchDelay", batchDelay.toString());
    form.append("emailDelay", emailDelay.toString());
    form.append("scheduleEmail", scheduleEmail ? "on" : "");
    form.append("scheduledTime", scheduledTime);
    form.append("notifyEmail", notifyEmail);
    form.append("notifyBrowser", notifyBrowser ? "on" : "");
    form.append("excelFile", excelFile);
    if (htmlTemplate) form.append("htmlTemplate", htmlTemplate);
    form.append("htmlContent", htmlContent);

    const res = await fetch("/send", { method: "POST", body: form });
    const json = await res.json();
    if (json.success) {
      alert(json.message);
    } else {
      alert("Error: " + json.message);
    }
  }
</script>

<div class="p-4 space-y-4">

  <!-- SMTP Selection -->
  <div class="border p-4 rounded bg-white">
    <h2 class="font-semibold mb-2">📧 SMTP Configuration</h2>
    <select bind:value={selectedConfigId} class="border rounded px-3 py-2 w-full">
      <option value="">-- Select SMTP Config --</option>
      {#each smtpConfigs as config}
        <option value={config.id}>
          {config.name} ({config.host}:{config.port})
        </option>
      {/each}
    </select>
  </div>

  <!-- Excel Upload -->
  <div class="border p-4 rounded bg-white">
    <h2 class="font-semibold mb-2">📄 Upload Contacts</h2>
    <input type="file" accept=".xlsx,.xls" on:change={handleExcelChange} class="border rounded px-3 py-2 w-full"/>
    {#if contactsPreview.length > 0}
      <div class="mt-2 text-sm text-gray-700">
        Preview ({contactsPreview.length}/{totalContacts} contacts):
        <ul class="list-disc ml-5">
          {#each contactsPreview as contact}
            <li>{contact.Email}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <!-- Email Content -->
  <div class="border p-4 rounded bg-white space-y-2">
    <h2 class="font-semibold mb-2">✉️ Email Content</h2>
    <input
      type="text"
      placeholder="Subject"
      bind:value={subject}
      class="border rounded px-3 py-2 w-full"
    />
    <textarea
      placeholder="Email content"
      bind:value={htmlContent}
      class="border rounded px-3 py-2 w-full h-48"
    ></textarea>
    <input type="file" accept=".html" on:change={handleHTMLTemplateChange}/>
    {#if htmlTemplate}
      <div class="text-sm text-green-600 mt-1">📄 HTML template selected</div>
    {/if}
  </div>

  <!-- Send Options -->
  <div class="border p-4 rounded bg-white space-y-2">
    <h2 class="font-semibold mb-2">⚡ Options</h2>

    <!-- Batch -->
    <label class="flex items-center gap-2">
      <input type="checkbox" bind:checked={useBatch}/>
      Enable Batch Processing
    </label>

    {#if useBatch}
      <div class="grid grid-cols-3 gap-2 mt-2">
        <input type="number" placeholder="Batch size" bind:value={batchSize} class="border rounded px-2 py-1"/>
        <input type="number" placeholder="Batch delay (min)" bind:value={batchDelay} class="border rounded px-2 py-1"/>
        <input type="number" placeholder="Email delay (sec)" bind:value={emailDelay} class="border rounded px-2 py-1"/>
      </div>
    {/if}

    <!-- Schedule -->
    <label class="flex items-center gap-2 mt-2">
      <input type="checkbox" bind:checked={scheduleEmail}/>
      Schedule Email
    </label>

    {#if scheduleEmail}
      <input type="datetime-local" bind:value={scheduledTime} class="border rounded px-2 py-1 w-full"/>
      <input type="email" placeholder="Notify Email" bind:value={notifyEmail} class="border rounded px-2 py-1 w-full mt-1"/>
      <label class="flex items-center gap-2">
        <input type="checkbox" bind:checked={notifyBrowser}/>
        Notify Browser
      </label>
    {/if}

    <input type="number" placeholder="Delay between emails (sec)" bind:value={delay} class="border rounded px-2 py-1 w-full mt-2"/>
  </div>

  <button class="bg-blue-600 text-white px-4 py-2 rounded" on:click={sendEmails}>
    🚀 Send Emails
  </button>
</div>
