import Ember from 'ember';

const assign = Ember.assign || Ember.merge;

export default function cloneOptions(o) {
  return assign({}, o);
}
