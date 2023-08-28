import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  // Removed: Firebase config
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Link Google Analytics
const analytics = getAnalytics(firebaseApp);

// Analytics: Track custom event
export const trackEvent = (eventName, eventParams = {}) => {
  logEvent(analytics, eventName, eventParams);
};

// Initialise Firebase Auth
export const auth = getAuth();

// Authentication: Sign in / sign up with Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  if (user && user.displayName) {
    const firstSpaceIndex = user.displayName.indexOf(" ");
    const firstName = user.displayName.substring(0, firstSpaceIndex);
    const lastName = user.displayName.substring(firstSpaceIndex + 1);
    return { user, firstName, lastName };
  }
  return { user };
};

// Authentication: Sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Authentication: Sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Authentication: Sign out
export const signOutUser = async () => await signOut(auth);

// Authentication: Wrap Firebase onAuthStateChanged listener in a promise
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      // Callback to execute after getting a userAuth object
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      // Callback to execute when an error is thrown
      reject
    );
  });
};

// Firestore
export const db = getFirestore();

// Firestore: Create document for each user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalDetails = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalDetails,
      });

      const newUserSnapshot = await getDoc(userDocRef);
      return newUserSnapshot;
    } catch (error) {
      // console.log("error logged:", error.message);
    }
  }

  return userSnapshot;
};

// Firestore: Update document for user
export const updateUserDocumentFromAuth = async (
  userAuth,
  additionalDetails = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", additionalDetails.id);

  try {
    const userSnapshot = await updateDoc(userDocRef, additionalDetails);

    return userSnapshot;
  } catch (error) {
    // console.log("error logged:", error.message);
  }
};

// Firestore: Create document for new order
export const createOrderDocument = async (orderId, cartItems, userAuth) => {
  if (!cartItems) return;

  const createdAt = new Date();

  const orderItem = cartItems.map((cartItem) => {
    return {
      orderItemId: cartItem.cartItemId,
      productId: cartItem.product_id,
      productName: cartItem.product_name,
      addOns: cartItem.selectedOptions,
      totalPrice: cartItem.totalPrice,
      timeslot: cartItem.selectedTimeslot,
      daysRequired: cartItem.total_days,
    };
  });

  const orderDocRef = doc(db, "orders", orderId);
  const userDocRef = doc(db, "users", userAuth.id);

  try {
    await setDoc(orderDocRef, {
      orderId: orderId,
      orderItem,
      user: userDocRef,
      createdAt,
    });
  } catch (error) {
    // console.log("error logged:", error.message);
  }
};

// Firestore: Retrieve raw data from Firestore
export const getProducts = async () => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getMapProductsContent = async () => {
  const mapCollectionRef = collection(db, "map_products_content");
  const mapQ = query(mapCollectionRef);
  const mapQuerySnapshot = await getDocs(mapQ);

  return mapQuerySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getContentAndOptions = async () => {
  const contentRef = collection(db, "content");
  const contentQ = query(contentRef);
  const contentQuerySnapshot = await getDocs(contentQ);

  const content = [];

  for (let doc of contentQuerySnapshot.docs) {
    const contentItem = doc.data();

    const optionsRef = collection(db, "content", doc.id, "options");
    const optionsQ = query(optionsRef);
    const optionsQuerySnapshot = await getDocs(optionsQ);

    const options = optionsQuerySnapshot.docs.map((doc) => doc.data());

    contentItem.options = options;
    content.push(contentItem);
  }

  return content;
};

export const getContent = async (contentIds) => {
  const content = [];

  for (let contentId of contentIds) {
    const contentRef = doc(db, "content", contentId);
    const contentSnapshot = await getDoc(contentRef);

    if (contentSnapshot.exists()) {
      content.push(contentSnapshot.data());
    }
  }

  return content;
};

export const getComparisonChart = async () => {
  const comparisonChartRef = collection(db, "comparison_chart");
  const comparisonChartSnapshot = await getDocs(comparisonChartRef);

  const data = comparisonChartSnapshot.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .sort((a, b) => a.order - b.order);

  return data;
};
