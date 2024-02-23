import config from "../config/config";
import { Services } from "../services/Services";

const FuelDashboard = async (payload, page, rowsPerPage) => {
  const apiEndPoint =
    config.baseUrl +
    config.apiEndPoints.getDetails +
    `?pageNo=${page}&pageSize=${rowsPerPage}`;

  const res = await Services.POST(apiEndPoint, payload);
  if (res) {
    return res;
  } else {
    return null;
  }
};

export const FuelDashboardAction = { FuelDashboard };
