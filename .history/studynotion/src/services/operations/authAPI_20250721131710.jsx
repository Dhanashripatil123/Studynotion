export function getPasswordResetToken(email, setEmailSent) {
                                                  return async (dispatch) => {
                                                                                                    dispatch(setLoading(true));
                                                                                                    try {
                                                                                                                                                      const response = await apiConnector("POST", RESETPASSWORD_API, { email, })

                                                                                                                                                      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

                                                                                                                                                      if (!response.data.success) {
                                                                                                                                                                                                        throw new Error(response.data.message);
                                                                                                                                                      }

                                                                                                                                                      toast.success("Reset Email Sent");
                                                                                                                                                      setEmailSent(true);
                                                                                                    }
                                                                                                    catch (error) {
                                                                                                                                                      console.log("RESET PASSWORD TOKEN Error");
                                                                                                    }

                                                                                                    dispatch(setLoading(false));
                                                  }
}
