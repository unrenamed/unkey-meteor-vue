<script setup>
import { KeySquareIcon, LogInIcon } from 'lucide-vue-next';
import { Meteor } from 'meteor/meteor';
import { ref } from 'vue';

const apiKey = ref('');
const error = ref('');

const login = async () => {
  try {
    const userId = await Meteor.callAsync('loginWithApiKey', apiKey.value);
    Meteor.connection.setUserId(userId);
  } catch (e) {
    console.error("Error:", e.reason);
    error.value = e.reason;
  }
}
</script>

<template>
  <form class="flex flex-col justify-center items-center w-full max-w-md my-8 px-8 gap-4" @submit.prevent="login">
    <div class="mt-4 w-full">
      <label for="apiKey" class="block text-white text-sm font-bold mb-2">API Key</label>
      <div class="relative w-full">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <KeySquareIcon color="black" :size="18" />
        </div>
        <input v-model="apiKey" type="password" name="apiKey" placeholder="Enter your Unkey API key..." required
          class="peer w-full rounded-md border border-gray-200 bg-white/95 px-10 text-black outline-none placeholder:text-gray-500 sm:text-sm transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-200 h-10">
      </div>
    </div>

    <div>
      <p class="text-xs md:text-base text-red-500">{{ error }}</p>
    </div>

    <button type="submit" class="relative group/button min-w-[200px] cursor-pointer">
      <div aria-hidden="true"
        class="absolute -inset-0.5 bg-white rounded-lg blur-2xl group-hover/button:opacity-30 transition duration-300 opacity-0">
      </div>
      <div
        class="flex w-full items-center justify-center px-4 gap-2 text-sm font-semibold text-black group-hover:bg-white/90 duration-1000 rounded-lg bg-gradient-to-r from-white/80 to-white h-10">
        <LogInIcon color="black" :size="18" />
        Log in
        <div aria-hidden="true"
          class="pointer-events-none absolute inset-0 opacity-0 group-hover/button:[animation-delay:.2s] group-hover/button:animate-button-shine rounded-[inherit] bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,.7),75%,transparent)]">
        </div>
      </div>
    </button>
  </form>
</template>
