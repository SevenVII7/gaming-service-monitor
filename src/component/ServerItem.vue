<template>
  <div
    class="item"
    :class="[
      props.itemData.status && props.itemData.status !== 'unknow'
        ? 'active'
        : '',
      props.isLoading ? 'loading' : '',
      props.accessible ? '' : 'denied',
    ]"
    @click="handleClick"
  >
    <div class="inner">
      <img :src="img" alt="" />
      <h6 class="txt-bold">
        {{ props.itemData.title }}
      </h6>
      <p v-if="props.itemData.status === 'unknow'">Unknow</p>
      <p v-else :class="[props.itemData.status ? 'active' : 'inactive']">
        <span>
          {{ props.itemData.status ? "Active" : "Inactive" }}
        </span>
      </p>
      <small>Port: {{ props.itemData.port || "-" }}</small>
      <small class="description">{{ props.itemData.description || "-" }}</small>
      <small>Operation: {{ props.accessible ? "OK" : "Denied" }}</small>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import type { ServerItemType } from "@/types/Types";
import img from "@/assets/img/servers.png";

const props = withDefaults(
  defineProps<{
    itemData: ServerItemType;
    isLoading: boolean;
    accessible?: boolean;
    getServerStatusFunction: () => void;
    startServerFunction: () => void;
    stopServerFunction: () => void;
  }>(),
  {
    accessible: false,
  }
);

function handleClick() {
  if (props.itemData.status === "unknow") {
    props.getServerStatusFunction();
  } else if (!props.itemData.status) {
    props.startServerFunction();
  } else if (props.itemData.status) {
    props.stopServerFunction();
  }
}

onMounted(async () => {
  await props.getServerStatusFunction();
});
</script>
<style scoped lang="scss">
.item {
  width: calc(25% - 20px);
  margin: 10px;
  border: 1px solid rgba(1, 14, 114, 0.2);
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px 5px rgba(1, 14, 114, 0.1);
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #f0f7ff;
  }
  &.active {
    border: 1px solid rgba(12, 114, 1, 0.2);
    box-shadow: 0 0 5px 5px rgba(12, 114, 1, 0.1);
  }
  &.loading {
    pointer-events: none;
    opacity: 0.3;
  }
  &.denied {
    pointer-events: none;
  }
  .inner {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    img {
      width: 30%;
      max-width: 70px;
      margin-bottom: 10px;
      opacity: 0.5;
    }
    > h6,
    > p,
    > small {
      width: 100%;
      margin: 2px 0;
      text-align: center;
      position: relative;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
    > p {
      &.active {
        &::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 8px;
          border-radius: 8px;
          background-color: #4cc22b;
        }
      }
      &.inactive {
        &::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 8px;
          border-radius: 8px;
          background-color: #d02323;
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
    > small {
      opacity: 0.7;
      &.description {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  @media screen and (max-width: 900px) {
    width: calc(33.3333% - 20px);
  }
  @media screen and (max-width: 600px) {
    width: calc(50% - 20px);
  }
  @media screen and (max-width: 425px) {
    width: calc(100% - 20px);
  }
}
</style>
