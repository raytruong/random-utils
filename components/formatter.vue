<script lang='ts' setup>
import {ref} from 'vue';

const placeholder = "Paste your nimble assertion output here";

const input = ref('');

function addLineBreaks(input: String): String {
  let brokenStringArray = input.split(', ')
  return brokenStringArray.join("\n")
}

function splitInput(input: String): [String, String] {
  if (!input) {
    return ["", ""]
  }

  let splitInput = input.split(", got")
  let expected: String
  let actual: String

  if(splitInput.length > 1) {
    expected = splitInput[0].substring(28)
    actual = splitInput[1]
  }
  else {
    return ["", ""]
  }

  let brokenExpected = addLineBreaks(expected)
  let brokenGot = addLineBreaks(actual)

  return [brokenExpected, brokenGot]
}

const prev = computed(() => {
  const out = splitInput(input.value)
  if (out.length > 0) {
    return out[0]
  }
  return ""
})

const current = computed(() => {
  const out = splitInput(input.value)
  if (out.length > 1) {
    return out[1]
  }
  return ""
})

</script>

<template>
  <textarea
      v-model="input"
      id="message" rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
  />
  <div v-if="prev && current" class="mt-6">
    <div class="grid grid-cols-2">
      <div class="text-medium font-semibold inline-block py-1 px-2 uppercase rounded bg-green-600 uppercase last:mr-0 mr-1 text-center">Expected</div>
      <div class="text-medium font-semibold inline-block py-1 px-2 uppercase rounded bg-red-600 uppercase last:mr-0 mr-1 text-center">Actual</div>
    </div>
  </div>
  <VueDiff
      class="mt-6"
      v-if="prev && current"
      :mode="mode"
      :theme="theme"
      :language="language"
      :prev="prev"
      :current="current"
    />
</template>

<style scoped>

</style>
