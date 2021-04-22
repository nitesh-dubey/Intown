import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

//It is provider which is used to provide global state, functions and data to whole app.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [likedEventSet, setLikedEventSet] = useState(new Set([]));

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        likedEventSet,
        setLikedEventSet,
        login: async (email, password) => {
          if(email == "" || password == "") {
            alert("Please Enter the details correctly");
            return;
          }
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            alert(e);
            // console.log(e);
          }
        },
        register: (name, email, password) => {
          if(email == "" || password == "" || name == "") {
            alert("Please Enter the details Correctly.");
            return;
          }
          auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                  return res.user.updateProfile({ displayName : name })
                })
                .then(() => {
                  const currUser = auth().currentUser;
                  
                  let userInfo = {
                    uid : currUser.uid,
                    name : name,
                    email : currUser.email,
                    eventsCreatedCount : 0,
                    likedEventList : []
                  }

                  setUser(userInfo);
                  setLikedEventSet(new set());
                  return firestore()
                          .collection('Users')
                          .doc(userInfo.uid)
                          .set(userInfo);

                })
                .catch(e => {alert(e)});
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            alert(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
