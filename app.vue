<template>
  <VitePwaManifest/>
  <div
    v-if="detectedAdBlocker"
    class="fixed top-0 left-0 z-10 | w-screen h-screen | bg-white | flex items-center justify-center">
    Please disable the ad blocker.
  </div>
  <div class="w-full flex items-center justify-center">
    <div
      class="flex flex-col items-center justify-center gap-4 | w-full max-w-[400px] | px-4 py-8"
      style="height: 100svh">
      <div class="mb-auto"></div>
      <h1 class="text-4xl font-bold text-slate-600 uppercase">Simple Lotto</h1>
      <ClientOnly>
        <select
          :value="lottoList.selectedLottoValue"
          class="px-2 py-1 mb-4 | outline-0 | border rounded-md | shadow-md bg-slate-600 text-white capitalize"
          @change="changeLotto">
          <option
            v-for="lotto in lottoList.list"
            :key="lotto.value"
            :value="lotto.value"
            :label="lotto.label"
            class="capitalize notranslate bg-white text-slate-600">{{ lotto.label }}</option>
        </select>
      </ClientOnly>
      <div
        v-if="numberManager.numbers.length"
        class="flex flex-wrap justify-center gap-x-1 gap-y-2 | mb-4">
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
      <div v-if="!closedAd" class="relative | w-[320px] | text-center">
        <button
          class="absolute top-1 left-1 | flex | bg-white"
          @click="closeAd">
          <i class="icon icon-close text-sm"></i>
        </button>
        <iframe
          width="320"
          height="50"
          allowtransparency="true"
          src="https://mtab.clickmon.co.kr/pop/wp_m_320.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1138899%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL&mon_direct_url=URLENCODE_PASSBACK_INPUT"
          frameborder="0"
          scrolling="no"></iframe>
        <span class="text-sm text-slate-500">
          Clicking on the advertisement brings greater fortune.
        </span>
      </div>
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

useSeoMeta({
  title: 'Simple Lotto',
  ogTitle: 'Simple Lotto',
  description: 'Simple lotto number generator',
  ogDescription: 'Simple lotto number generator',
})

const router = useRouter()
const route = useRoute()

const numberElement = ref<HTMLElement[]>()

const lottoList = reactive(LottoManager.of())
const numberManager = reactive(NumberManager.of(lottoList))

const changeLotto = (event: Event) => {
  numberManager.emptyNumbers()
  const value = `${getEventTargetValue(event)}`
  lottoList.selectLottoValue(value)
  router.replace({ query: { lotto: value } })
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

const closedAd = ref(false)
const closeAd = () => (closedAd.value = true)

const detectedAdBlocker = ref(false)
const detectAdBlocker = (value: boolean) => (detectedAdBlocker.value = value)

setTimeout(function () {
  fetch('https://www3.doubleclick.net', {
    method: 'HEAD',
    mode: 'no-cors',
    cache: 'no-store',
  }).catch(() => detectAdBlocker(true))
}, 1000)

onMounted(() => {
  if (route.query.lotto) lottoList.selectLottoValue(String(route.query.lotto))

  navigator.serviceWorker.register('/sw.js')
})
</script>
