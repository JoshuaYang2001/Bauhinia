<template>
  <div class="background">
    <div
      class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md space-y-8">
        <div>
          <h2
            class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100"
          >
            Bauhinia智能交互系统
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            {{ " " }}
            <router-link to="/"
              ><a
                href=""
                class="font-medium text-indigo-400 hover:text-indigo-300"
                >使用游客身份体验</a
              ></router-link
            >
          </p>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">你的电子邮箱</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="  你的电子邮箱"
              />
            </div>
            <div>
              <label for="password" class="sr-only">密码</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="  密码"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm text-indigo-400"
                >记住我</label
              >
            </div>

            <div class="text-sm">
              <span
                href=""
                class="font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >忘记密码?</span
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              </span>
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.background {
  background-color: rgb(30 41 59);
  height: 100vh;
}
</style>
