import { showErrorMessage } from "../constants";
import { apiClient } from "./apiClients";

export class apiEndPoints {
  static extractError(error) {
    let extracted = [];
    if (error.isAxiosError) {
      if (error.response) {
        if (error.response.data && error.response.message) {
          extracted.push(error.response.message);
        } else {
          extracted.push("An unexpected Error occurred");
        }
      } else if (error.request) {
        extracted.push("Network Error Occurred");
      } else {
        extracted.push("An Unexpected Error Occurred");
      }
    } else {
      extracted.push(error.message || "An unexpected Error occurred");
    }
    extracted.forEach((errorMsg) => showErrorMessage(errorMsg));
  }

  static async signIn(data) {
    try {
      return apiClient.post("/auth/login", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async register(data) {
    try {
      return apiClient.post("/auth/register", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async forgotPassword(data) {
    try {
      return apiClient.post("/auth/forgot-password", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async resetPassword(data) {
    try {
      return apiClient.post("/auth/reset-password", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async dashboard(data) {
    try {
      return apiClient.get("/dashboard", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

}