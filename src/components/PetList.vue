<template>
  <div class="container">
    <div class="title">宠物列表</div>
    <div class="item" v-for="item in computedPets">
        {{ item.id + item.name }}
    </div>
  </div>
  <button v-if="!isPending" class="btn" @click="goToNextPage">前往下一页</button>
</template>

<script setup lang='ts'>
import { useInfiniteQuery } from '@tanstack/vue-query';
import { getPetList as ajaxGetPetList } from '@/request'
import { computed } from 'vue';

const getPetList = async ({
    pageParam = 1
}) => {
    const res = await ajaxGetPetList(pageParam, 10)
    console.log('!=====res', res)
    return res
}

const computedPets = computed(() => data.value?.pages.reduce((prev, cur) => [...prev, ...cur.pets], []))

const { data, isPending, fetchNextPage } = useInfiniteQuery({
    queryKey: ['keys'],
    queryFn: getPetList,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
        // return lastPage.pagination.page > 10 ? undefined : lastPage.pagination.page + 1
        return lastPage.pagination.page + 1
    },
    refetchOnMount: false
})

const goToNextPage = () => {
    fetchNextPage()
}

</script>
<style scoped>
.container {
    width: 400px;
    max-height: 600px;
    overflow: auto;
    border: 1px solid #969696;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.container > .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
}
.container > .item {
    flex: 1;
    margin-bottom: 4px;
    font-size: 14px;
}
</style>