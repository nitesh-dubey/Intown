import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

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
                  return res.user.updateProfile({ displayName : name })
                })
                .then(() => {
                  const currUser = auth().currentUser;
                  
                  let userInfo = {
                    uid : currUser.uid,
                    name : name,
                    email : currUser.email,
                    eventsCreatedCount : 0,
                    attendingEventList : [],
                    likedEventList : []
                  }

                  setUser(userInfo);
                  return firestore()
                          .collection('Users')
                          .doc(userInfo.uid)
                          .set(userInfo);

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
