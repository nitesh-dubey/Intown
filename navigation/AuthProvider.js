import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: (name, email, password) => {
          if(email == "" || password == "" || name == "") {
            alert("Please Enter the details Correctly.");
            return;
          }
          auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                  res.user.updateProfile({
                    displayName : name
                  })
                  console.log(auth().currentUser);
                })
                .catch(e => console.log(e));
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
