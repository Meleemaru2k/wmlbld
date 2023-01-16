<template>
  <div>
    <div>Create Game</div>
    <button @click="createGame()">testgame</button>
    <input ref="image" type="file" accept="image/png, image/jpg, image/jpeg" />
  </div>
</template>
<script setup lang="ts">
const gameData = {
  name: "abc",
  authorId: 1,
  passphrase: "sample",
  description: "Find things in this image! :)",
  image: "",
  eggs: [
    {
      pos_x: 1468,
      pos_y: 791,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      pos_x: 2565,
      pos_y: 1415,
      size: 50,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      pos_x: 950,
      pos_y: 1205,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
    {
      pos_x: 2730,
      pos_y: 1115,
      size: 25,
      description: "Find the jumping man in a yellow shirt",
      hint: "This person really loves to hang out at the beach",
    },
  ],
};

const image = ref<HTMLInputElement | null>(null);

async function createGame() {
  //const base64Image = async () => {
  //  const reader = new FileReader();
  //  console.log(image.value?.files[0]);
  //  reader.readAsDataURL(image.value?.files[0]);
  //  console.log(reader.result);
  //  return "abc";
  //};
  gameData.image = "abc";
  await useFetch("/api/game/create", {
    body: { gameData },
    method: "POST",
  }).then((x) => console.log(x));
  //console.log(data);
}
</script>
