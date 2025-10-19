import Tomster from '~icons/logos/ember-tomster';

import FileJavaScript from '~icons/devicon/javascript';
import styles from './application.module.css';

<template>
  <h2 id="title">Welcome to Ember</h2>
  <Tomster />
  <FileJavaScript class={{styles.large}} />

  {{outlet}}
</template>
