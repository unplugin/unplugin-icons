import 'unplugin-icons/types/ember';
import { pageTitle } from 'ember-page-title';
import Tomster from '~icons/logos/ember-tomster';

import FileJavaScript from '~icons/devicon/javascript';
import styles from './application.module.css';

<template>
  {{pageTitle "EmberViteExample"}}
  <h2 id="title">Welcome to Ember</h2>
  <Tomster />
  <FileJavaScript class={{styles.large}} />

  {{outlet}}
</template>
