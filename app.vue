<template>
  <div class="w-full flex items-center justify-center">
    <div
      class="flex flex-col items-center justify-center gap-8 | w-full max-w-[400px] | px-4 py-8"
      style="height: 100svh">
      <div class="mb-auto"></div>
      <h1 class="text-4xl font-bold text-slate-600 uppercase">Simple Lotto</h1>
      <div
        v-if="numberManager.numbers.length"
        class="flex flex-wrap justify-center gap-x-1 gap-y-2">
        <div
          v-for="(number, index) in numberManager.numbers"
          :key="index"
          ref="numberElement"
          :data-end-number="number"
          class="flex flex-wrap items-center justify-center | border shadow-md | notranslate font-bold text-white | w-9 aspect-square rounded-full"
          :class="
            lottoList.checkSpecialBall(index) ? 'bg-orange-500' : 'bg-slate-600'
          ">
          {{ number }}
        </div>
      </div>
      <button
        class="w-full | py-2 | text-slate-500 | border border-slate-300 shadow-md shadow-slate-200 | active:bg-slate-100 active:shadow-sm | rounded-md"
        @click="generate">
        Generate
      </button>
      <select
        :value="lottoList.selectedLottoValue"
        class="px-2 py-1 | outline-0 | bg-white | text-slate-500 capitalize"
        @change="changeLotto">
        <option
          v-for="lotto in lottoList.list"
          :key="lotto.value"
          :value="lotto.value"
          :label="lotto.label"
          class="capitalize notranslate"></option>
      </select>
      <p class="text-sm text-slate-500 | mt-auto">
        Lotto is a doorway to fulfilling dreams. Wishing that your lotto ticket
        is filled with numbers brimming with good fortune!
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LottoManager } from '~/models/Lotto'
import { NumberManager } from '~/models/Number'
import { count } from '~/models/counterAnimation'
import { getEventTargetValue } from '~/utils/util'

const numberElement = ref<HTMLElement[]>()

const lottoList = reactive(LottoManager.of())
const numberManager = reactive(NumberManager.of(lottoList))

const changeLotto = (event: Event) => {
  numberManager.emptyNumbers()
  lottoList.selectLottoValue(`${getEventTargetValue(event)}`)
}

const generate = () => {
  numberManager.generateNumbers()
  setTimeout(() =>
    toValue(numberElement)?.forEach((el) =>
      count({
        target: el,
        startNumber: 0,
        endNumber: Number(el.dataset.endNumber),
        duration: 250,
      })
    )
  )
}
</script>
