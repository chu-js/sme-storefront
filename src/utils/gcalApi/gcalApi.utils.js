import axios from "axios";

export const fetchAuth = async (idToken) => {
  try {
    const response = await axios({
      // Removed: API endpoint
      url: "https://xxx.com/xxx",
      method: "get",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAvailableSlots = async (slotType, housingType) => {
  try {
    const availableSlots = await axios({
      // Removed: API endpoint
      url: "https://xxx.com/xxx",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        slot_type: slotType,
      },
    });
    if (housingType == "Condo") {
      availableSlots.data = availableSlots.data.filter((slot) =>
        slot.start.includes("09:00:00+08:00")
      );
    }
    return availableSlots.data;
  } catch (error) {
    throw error;
  }
};

export const bookSlot = async (orderId, cartItem, user) => {
  try {
    const response = await axios({
      // Removed: API endpoint
      url: "https://xxx.com/xxx",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        // Removed: data sent to API
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
