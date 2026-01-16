import type { TPoster } from "components/Main/Film/Film";
import { API_URL } from "./config";

type TRegister = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

type TLogin = {
  email: string;
  password: string;
};

export type TSuccess = {
  success: boolean;
};

export type TError = {
  error: string;
};

export type TFilm = {
  id: string;
};

export type TUser = {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
}

export const userRegister = async (user: TRegister): Promise<TRegister> => {
  const response = await fetch(API_URL + "/user", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  if (!response.ok) {
    throw new Error("Ошибка выхода");
  }
  return await response.json();
};

export const userLogout = async (): Promise<void> => {
  const response = await fetch(API_URL + "/auth/logout", {
    credentials: "include",
  })
if (!response.ok) {
  throw new Error("Ошибка выхода");
}
return await response.json();
};

export const userLogin = async (user:TLogin): Promise<TLogin> => {
  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Ошибка входа");
  }
  return await response.json();
};

// export const getUser = (): Promise<any> => {
//   return fetch(API_URL + "/profile", {
//     credentials: "include",
//   })
//     .then(getResponse)
//     .catch((err) => console.log(err.message));
// };

export const getUser = async():Promise<TUser> => {
  const response = await fetch(API_URL + "/profile", {
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Не удалось получить данные пользователя");
  }
  return await response.json();
}

// export const getFav = (): Promise<any> => {
//   return fetch(API_URL + "/favorites", {
//     credentials: "include",
//   })
//     .then(getResponse)
//     .catch((err) => console.log(err.message));
// };

export const getFav = async ():Promise<TPoster[]> => {
  const response = await fetch(API_URL + "/favorites", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Не удалось получить список избранных фильмов");
  }
  return await response.json();
}

export const addToFav = async (
  id: string
): Promise<TPoster> => {
  const response = await fetch(API_URL + "/favorites", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Не удалось добавить в избранное");
  }

  return await response.json();
};


export const removeFromFav = async (
    movieId: string,
  ): Promise<TPoster> => {
    const response = await fetch(API_URL + `/favorites/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Не удалось удалить из избранного");
    }
  
    return await response.json();
  };