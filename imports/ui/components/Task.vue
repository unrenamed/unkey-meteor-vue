<script setup>
import { Trash2Icon } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const taskRef = ref({ ...props.task });

const isChecked = computed(() => taskRef.value.checked);

const handleCheckboxChange = async (event) => {
  const newCheckedValue = event.target.checked;
  taskRef.value.checked = newCheckedValue;
  try {
    await Meteor.callAsync('setIsCheckedTask', taskRef.value._id, newCheckedValue);
  } catch (error) {
    console.error('Error updating task checked state:', error);
  }
};

const deleteTask = async () => {
  try {
    await Meteor.callAsync('removeTask', taskRef.value._id);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
</script>

<template>
  <li class="relative grid grid-cols-[min-content_1fr_min-content] gap-x-4">
    <div class="flex justify-center items-center w-5">
      <input v-model="taskRef.checked" class="w-full h-full" type="checkbox" readonly :checked="isChecked"
        @change="handleCheckboxChange" />
    </div>
    <span class="flex items-center text-start text-white/85 break-all"
      :class="{ 'text-gray-400 italic line-through': taskRef.checked }">
      {{ task.text }}
    </span>
    <div class="flex items-center">
      <button
        class="ml-auto group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border text-sm transition-all border-transparent bg-red-600/5 px-3 text-red-600 hover:bg-red-600/10 hover:text-red-700"
        @click="deleteTask">
        <Trash2Icon :size="18" />
      </button>
    </div>
  </li>
</template>
