<script lang="ts">
  import { onMount } from "svelte";
  import SMTPConfigList from '$lib/components/config/SMTPConfigList.svelte';
  import SMTPConfigForm from '$lib/components/config/SMTPConfigForm.svelte';
  import type { SMTPConfig } from '$lib/types';

  let configs: SMTPConfig[] = [];
  let loading = true;
  let error = "";
  let showModal = false;
  let modalMode: "add" | "edit" = "add";
  let currentConfig: Partial<SMTPConfig> = {};

  async function fetchConfigs() {
    loading = true;
    try {
      const res = await fetch("/api/config/smtp");
      const data = await res.json();
      if (data.success) configs = data.userConfigs;
      else error = data.message || "Failed to fetch configs";
    } catch (err) {
      error = "Error fetching configs";
      console.error(err);
    }
    loading = false;
  }

  function openAddModal() {
    modalMode = "add";
    currentConfig = {};
    showModal = true;
  }

  function openEditModal(cfg: SMTPConfig) {
    modalMode = "edit";
    currentConfig = { ...cfg };
    showModal = true;
  }

  async function saveConfig(e: CustomEvent<Partial<SMTPConfig>>) {
    const cfg = e.detail;
    try {
      const url = modalMode === "add" ? "/api/config/smtp" : `/api/config/smtp/${cfg.id}`;
      const method = modalMode === "add" ? "POST" : "PUT";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(cfg) });
      const data = await res.json();
      if (data.success) {
        fetchConfigs();
        showModal = false;
      } else alert(data.message);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteConfig(id: string) {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/config/smtp/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchConfigs();
      else alert(data.message);
    } catch (err) { console.error(err); }
  }

  async function testConnection(cfg: SMTPConfig) {
    try {
      const res = await fetch(`/api/config/smtp/test`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cfg) });
      const data = await res.json();
      alert(data.message);
    } catch (err) { console.error(err); }
  }

  async function setDefault(id: string) {
    try {
      const res = await fetch(`/api/config/smtp/${id}/default`, { method: "POST" });
      const data = await res.json();
      if (data.success) fetchConfigs();
      else alert(data.message);
    } catch (err) { console.error(err); }
  }

  onMount(fetchConfigs);
</script>

<div class="p-4 space-y-4">
  <div class="flex justify-between items-center mb-3">
    <h2 class="text-xl font-semibold">📧 My SMTP Configurations</h2>
    <button class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" on:click={openAddModal}>+ Add New</button>
  </div>

  {#if loading} <div>Loading...</div>
  {:else if error} <div class="text-red-500">{error}</div>
  {:else if configs.length === 0} <div class="text-gray-500">No configurations found.</div>
  {:else}
    <SMTPConfigList {configs}
      on:edit={(e) => openEditModal(e.detail)}
      on:delete={(e) => deleteConfig(e.detail)}
      on:test={(e) => testConnection(e.detail)}
      on:setdefault={(e) => setDefault(e.detail)}
    />
  {/if}

  <SMTPConfigForm {showModal} config={currentConfig} mode={modalMode} 
    on:save={saveConfig} on:close={() => showModal=false} />
</div>
