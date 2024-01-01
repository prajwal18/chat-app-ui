export enum Pages {
  Enter_Email,
  Verify_OTP,
  Reset_Password,
}

export const getPageTitle = (page: Pages) => {
  switch (page) {
    case Pages.Enter_Email:
      return "Enter Email";
    case Pages.Verify_OTP:
      return "Verify OTP";
    case Pages.Reset_Password:
      return "Change Password";
    default:
      return "";
  }
};
