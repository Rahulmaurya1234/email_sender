<div class="bg-white rounded shadow p-4 mt-4">
  <h3 class="font-semibold mb-2">✉️ Email Content</h3>

  <input
    id="email-subject"
    class="border p-2 w-full mb-2"
    placeholder={`Subject (Hello {{FirstName}})`}
  />

  <textarea
    class="border p-2 h-60 w-full"
    placeholder="Write your email..."
  ></textarea>

  <div class="flex gap-2 mt-3">
    <button class="bg-blue-600 text-white px-4 py-1 rounded">
      🚀 Send
    </button>
    <button class="bg-gray-300 px-4 py-1 rounded">
      👁 Preview
    </button>
  </div>
</div>
