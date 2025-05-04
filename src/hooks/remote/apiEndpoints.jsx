import { showErrorMessage } from "../constants";
import { apiClient, apiClientWithToken } from "./apiClients";

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

  static async dashboard() {
    try {
      return apiClientWithToken.get("/dashboard");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async collections() {
    try {
      return apiClientWithToken.get("/webhook/notifications");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async endOfDaySummary() {
    try {
      return apiClientWithToken.get("/settlements/merchant-aggregates");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async settlementDetails() {
    try {
      return apiClientWithToken.get("/settlements/getSettlements");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async partnerSettlement() {
    try {
      return apiClientWithToken.get("/merchant-bank-account-settlement/get-settlement-report");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listUsers() {
    try {
      return apiClientWithToken.get("/users");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateUser(userID) {
    try {
      return apiClientWithToken.patch(`/users/${userID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listRoles() {
    try {
      return apiClientWithToken.get("/roles/get-all-roles");
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

}