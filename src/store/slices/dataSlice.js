import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
  name: "data",

  initialState: {
    sidebar: false,
  },

  reducers: {
    toggleSidebar(state, action) {
      state.sidebar = action.payload
    },
  },
})

export const { toggleSidebar } = dataSlice.actions
export const dataReducer = dataSlice.reducer
