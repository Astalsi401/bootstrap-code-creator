import { createSlice, configureStore } from "@reduxjs/toolkit";

export const defaultCol = {
  size: 12,
  content: "edit text here",
  screen: "-xs",
  fontSize: "12pt",
  fontColor: "inherit",
  imgUrl: "",
  imgAlt: "",
};

const counterSlice = createSlice({
  name: "bootstrapCodeCreator",
  initialState: {
    ver: "3.3.7",
    site: "ibmi",
    rows: [],
    stylingActive: true,
    currentID: null,
    currntI: null,
    fontSize: {
      ibmi: {
        "xxxx-large": "3rem",
        "xxx-large": "2.2rem",
        "xx-large": "2rem",
        "x-large": "1.5rem",
        large: "1.1rem",
        medium: "1rem",
        small: "0.8rem",
        "x-small": "0.75rem",
        "xx-small": "0.6rem",
      },
      show: {
        "xxx-large": "35px",
        "xx-large": "28px",
        "x-large": "22px",
        large: "20px",
        medium: "18px",
        small: "16px",
        "x-small": "14px",
      },
      inno: {
        "xxx-large": "30px",
        "xx-large": "24px",
        "x-large": "22px",
        large: "20px",
        medium: "18px",
        small: "16px",
        "x-small": "14px",
        "xx-small": "12px",
      },
    },
    themeColor: {
      ibmi: {
        primary: "#055eab",
        black: "#000000",
        white: "#ffffff",
        gray: "#808080",
        title: "#180085",
        inherit: "inherit",
      },
      show: {
        primary: "#055eab",
        black: "#000000",
        white: "#ffffff",
        gray: "#808080",
        title: "#180085",
        "hight-light": "#1e00a5",
        "white-glass": "rgba(255, 255, 255, 0.6)",
        btn: "#c7334c",
        orange: "rgb(255, 81, 0)",
        blue: "#3b5998",
      },
      inno: {
        primary: "rgb(89, 40, 131)",
        secdonary: "rgb(12, 79, 210)",
        black: "rgb(0, 0, 0)",
        white: "rgb(255, 255, 255)",
        "white-500": "rgb(255, 255, 255, 0.5)",
        unactivated: "rgb(157, 157, 157)",
        hl: "rgb(255, 165, 0)",
      },
    },
  },
  reducers: {
    setter: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
        if (key === "rows") localStorage.setItem("rows", JSON.stringify(state.rows));
      });
    },
    setRow: (state, { payload }) => {
      const { id, ...vals } = payload;
      Object.keys(vals).forEach((key) => {
        const rowIndex = state.rows.findIndex((row) => row.id === id);
        state.rows[rowIndex][key] = vals[key];
        console.log(state.rows);
        localStorage.setItem("rows", JSON.stringify(state.rows));
      });
    },
    setCol: (state, { payload }) => {
      const { id, i, ...vals } = payload;
      Object.keys(vals).forEach((key) => {
        const rowIndex = state.rows.findIndex((row) => row.id === id);
        state.rows[rowIndex].cols[i][key] = vals[key];
        localStorage.setItem("rows", JSON.stringify(state.rows));
      });
    },
  },
});

export const { setter, setRow, setCol } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
