<template>
  <input
    @change="$emit('image-picked', $event.target)"
    ref="image"
    type="file"
    accept="image/png, image/jpg, image/jpeg"
  />
</template>
