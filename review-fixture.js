import { exec } from "node:child_process";

export function renderReport(reportName, callback) {
  exec("cat reports/" + reportName, callback);
}
