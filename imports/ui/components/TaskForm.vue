<script setup>
import { ref } from 'vue';
import { Meteor } from 'meteor/meteor';

const newTask = ref('');

const addTask = async () => {
  await Meteor.callAsync('insertTask', newTask.value.trim());
  newTask.value = '';
}
</script>

<template>
  <form @submit.prevent="addTask" class="grid grid-cols-[1fr_min-content] gap-x-2">
    <input v-model="newTask"
      class="w-full rounded-md border border-gray-200 bg-white/95 px-5 text-black outline-none placeholder:text-gray-500 sm:text-sm transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-200 h-10"
      type="text" placeholder="Type to add new tasks" required />
    <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold h-10 px-4 rounded"
      type="submit">Add</button>
  </form>
</template>
