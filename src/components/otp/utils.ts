export enum Pages {
  Enter_Email,
  Validate_OTP,
  Validation_Status,
}

export const getPageTitle = (page: Pages) => {
  switch (page) {
    case Pages.Enter_Email:
      return "Get";
    case Pages.Validate_OTP:
      return "Validate";
    case Pages.Validation_Status:
      return "Validation Status";
    default:
      return "";
  }
};
