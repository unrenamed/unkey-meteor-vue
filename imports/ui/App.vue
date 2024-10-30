<script setup>
import Task from './components/Task.vue';
import TaskForm from './components/TaskForm.vue';
import { subscribe, autorun } from 'vue-meteor-tracker';
import { TasksCollection } from '../api/TasksCollection';
import LoginForm from './components/LoginForm.vue';
import { ref, watch } from 'vue';
import { LogOutIcon } from 'lucide-vue-next';

const hideCompleted = ref(false);
const isLogged = ref(false);
const userId = autorun(() => Meteor.userId()).result;

subscribe('tasks');

const tasks = autorun(() => {
  const filter = hideCompleted.value ? { checked: { $ne: true }, userId: userId.value } : { userId: userId.value };
  return TasksCollection.find(filter, { sort: { createdAt: -1 } }).fetch();
}).result;

const incompleteTasksCount = autorun(() => {
  return TasksCollection.find({ checked: { $ne: true }, userId: userId.value }).count()
}).result;

const toggleHideCompleted = () => {
  hideCompleted.value = !hideCompleted.value
};

const logout = () => Meteor.logout();

watch(
  () => userId.value,
  (newUser) => {
    isLogged.value = !!newUser
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-inherit text-white min-h-[100dvh] overflow-y-auto overflow-x-hidden relative"
    :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <div v-if="isLogged">
      <header class="flex items-center justify-between max-w-7xl mx-auto p-6 lg:px-8">
        <h1 class="text-2xl sm:text-4xl font-bold my-4 text-white/90">📋 To-Do List
          <span v-if="incompleteTasksCount > 0" class="text-sm sm:text-lg font-light text-gray-200">({{
            incompleteTasksCount
            }})</span>
        </h1>

        <button @click="logout"
          class="flex items-center px-4 gap-2 text-sm font-semibold bg-transparent hover:bg-neutral-900 text-white border border-transparent hover:border-neutral-800 rounded-lg h-10">
          <LogOutIcon color="white" :size="18" />
          <p class="md:block hidden">Logout</p>
        </button>
      </header>
      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          class="relative flex flex-col gap-4 mb-8 md:max-w-lg md:mx-auto md:mb-0 md:mt-8 md:px-4 md:py-8 text-center md:bg-neutral-900 md:rounded-lg">
          <TaskForm />
          <div>
            <button class="text-sm font-semibold text-gray-200 hover:text-gray-300" @click="toggleHideCompleted">
              <span v-if="hideCompleted">Show all</span>
              <span v-else>Hide completed</span>
            </button>
          </div>
          <ul
            class="flex flex-col gap-2 list-none list-inside px-2 md:max-h-[400px] md:min-h-[400px]  overflow-y-auto scrollbar-thin scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl scrollbar-track-neutral-900 scrollbar-thumb-neutral-700">
            <Task v-for="task of tasks" :key="task._id" :task="task" />
          </ul>
          <div
            class="pointer-events-none absolute bottom-0 left-0 hidden h-32 w-full bg-gradient-to-t from-neutral-900 rounded-lg md:block">
          </div>
        </div>
      </div>
    </div>

    <div v-else class="mt-20 text-white flex flex-col gap-y-4 items-center justify-center h-full w-full pb-8">
      <h1 class="text-center text-4xl font-extrabold leading-[1.15] sm:text-6xl sm:leading-[1.15]">
        Secure Your Meteor ☄️
        <br>
        <span class="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          with Unkey
        </span>
      </h1>
      <p class="text-center text-neutral-500 text-sm sm:text-lg">
        You must be logged in to get access to your collection
      </p>
      <LoginForm />
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(0 0 0 / 0.65);
}

#app {
  background: inherit;
}
</style>
