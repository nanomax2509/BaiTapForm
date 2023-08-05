import { ReactForm } from "./react-form.const";

const STATE_DEFAULT = {
  mangSV: JSON.parse(
    localStorage.getItem("FormReact") ?? JSON.stringify([])
  ),
  svChinhSua: null,
};

export const reactFormReducer = (state = STATE_DEFAULT, action) => {
  switch (action.type) {
    case ReactForm.DangKySinhVien: {
      state.mangSV = [...state.mangSV, action.payload];

      localStorage.setItem("FormReact", JSON.stringify(state.mangSV));

      return { ...state };
    }
    case ReactForm.XoaSinhVien: {
      state.mangSV = state.mangSV.filter(
        (sv) => sv.id !== action.payload.id
      );
      return { ...state };
    }
    case ReactForm.ChinhSuaSinhVien: {
      state.svChinhSua = action.payload;

      return { ...state };
    }

    case ReactForm.HoanThienChinhSua: {
     
      const index = state.mangSV.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index === -1) {
        return { ...state };
      }
    
      state.mangSV[index] = action.payload;
      state.mangSV = [...state.mangSV];

      state.svChinhSua = null;
      return { ...state };
    }
    default:
      return state;
  }
};
