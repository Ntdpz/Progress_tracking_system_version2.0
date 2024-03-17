export const state = () => ({
  user_id: undefined,
});

export const mutations = {
  setState(state, payload) {
    this.replaceState(Object.assign(state, payload));
  },
};

export const actions = {};
