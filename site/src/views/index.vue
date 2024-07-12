<template>
  <div class="page main_padding">
    <p class="txt-center">gaming.xinchii.com</p>
    <br /><br />
    <div class="w1200">
      <div class="itembox">
        <ServerItem
          :itemData="testServerItem"
          :isLoading="isTestServerLoading"
          :getServerStatusFunction="getApiTesting"
          :startServerFunction="getApiTesting"
          :stopServerFunction="getApiTesting"
          :accessible="true"
        />
        <ServerItem
          :itemData="palServerItem"
          :isLoading="isPalServerLoading"
          :getServerStatusFunction="getPalServerStatus"
          :startServerFunction="startPalServer"
          :stopServerFunction="stopPalServer"
          :accessible="accessible"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ServerItem from "@/component/ServerItem.vue";
import { apiAccessible } from "@/service/api/index";
import type { ServerItemType } from "@/types/Types";

const { doGetAccessible, isLoading: isApiAccessibleLoading } = apiAccessible();
const accessible = ref<boolean>(false);

onMounted(async () => {
  try {
    await doGetAccessible();
    accessible.value = true;
  } catch {
    accessible.value = false;
  }
});

// === Test Server setting ===
import { apiTesting } from "@/service/api/index";

const { doApiTesting, isLoading: isApiTestingLoading } = apiTesting();

const testServerItem = ref<ServerItemType>({
  title: "Always active",
  status: "unknow",
  description: "Click to get info",
});
const isTestServerLoading = computed(() => isApiTestingLoading.value);
async function getApiTesting() {
  try {
    await doApiTesting();
    testServerItem.value.status = true;
  } catch (e) {
    console.error(e);
    testServerItem.value.status = false;
  }
}

// === Pal server setting ===
import {
  apiGetStatus,
  apiStartServer,
  apiStopServer,
} from "@/service/api/index";

const { doGetStatus, isLoading: isGetStatusLoading } = apiGetStatus();
const { doStartServer, isLoading: isStartServerLoading } = apiStartServer();
const { doStopServer, isLoading: isStopServerLoading } = apiStopServer();

const isPalServerLoading = computed<boolean>(
  () =>
    isGetStatusLoading.value ||
    isStartServerLoading.value ||
    isStopServerLoading.value
);
const palServerItem = ref<ServerItemType>({
  title: "PalServer",
  port: 8211,
  status: "unknow",
  description: "幻獸帕魯",
});
async function getPalServerStatus() {
  try {
    await doGetStatus();
    palServerItem.value.status = true;
  } catch (e) {
    console.error(e);
    palServerItem.value.status = false;
  }
}
async function startPalServer() {
  try {
    await doStartServer();
  } catch (e) {
    console.error(e);
    palServerItem.value.status = "unknow";
  }
  await getPalServerStatus();
}
async function stopPalServer() {
  try {
    await doStopServer();
  } catch (e) {
    console.error(e);
    palServerItem.value.status = "unknow";
  }
  await getPalServerStatus();
}
</script>
<style scoped lang="scss">
.itembox {
  margin: -10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
