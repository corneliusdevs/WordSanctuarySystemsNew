import { Request, Response } from "express";
import {
  getInvitationDetailsValidator,
  InvitationRequestValidator,
  LoginRequestValidator,
  VerifyLoginRequestValidator,
} from "../validators/InvitationRequestValidator";
import { get_Data_Layer_Base_Api_Endpoint } from "../helpers/getDataLayerAPI_endpoint";
import { ZodError } from "zod";
import { TokenTypes } from "../types";
import { signJWT } from "../lib/jwt";

export const submitAccessRequestController = async (
  req: Request,
  res: Response
) => {
  try {
  } catch (err) {}
};

export const requestLoginCredentailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = LoginRequestValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_Base_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const loginRequestRes = await fetch(
      `${data_Layer_Base_Api_Endpoint}/accounts/auth/request/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsedBody.email,
        }),
      }
    );

    const response = await loginRequestRes.json();

    if (response?.success) {
      res.status(201).json({
        success: true,
        message: "Login credentails sent to user email",
      });

      return;
    }

    res.status(401).json({
      success: false,
      message: response?.message
        ? response.message
        : "Could not send login credentials. Please try again later.",
    });
  } catch (err) {
    console.log(`requestLoginCredentailsController encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message:
        "Internal Server error.requestLoginCredentailsController encountered an error. Please try again later.",
    });

    return;
  }
};

export const verifyLoginRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = VerifyLoginRequestValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_Base_Api_Endpoint();

    const getVerificationDetailsFromDb = await fetch(
      `${data_Layer_Base_Api_Endpoint}/accounts/auth/request/login/getCredentials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsedBody.email,
          otp: parsedBody.otp,
        }),
      }
    );

    const response = await getVerificationDetailsFromDb.json();

    console.log("login verification details ", response)

    if (getVerificationDetailsFromDb.ok) {
      //  if the token has not expired and it of type "LOGIN"
      if (
        Date.now() <= response?.data.expiration &&
        response?.data.token_type === TokenTypes.LOGIN
      ) {
        //  get the login token
        const token = signJWT({
          profileId: response.data.profile_id,
          email: parsedBody.email
        }, "1h")
        
        // Set login token in HTTP-only cookie
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          maxAge: 1000 * 60 * 60, // Token expiration (1 hour)
          sameSite: "strict",
        });

        // set the response
        res.status(200).json({
          verified: true,
          message: "user verified",
          is_token_expired: false,
        });

        return;
      } else {
        res.status(401).json({
          verified: false,
          message: "Could not verify user",
          is_token_expired: true,
        });
      }

      return;
    }

    res.status(401).json({
      verified: false,
      message: "Could not verify user",
      is_token_expired: false,
    });

    return;
  } catch (err) {
    console.log(`verifyLoginRequestController encountered an err `, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};

export const invitationRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = InvitationRequestValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_Base_Api_Endpoint();

    console.log("endpoint ", data_Layer_Base_Api_Endpoint);

    const invitationRequestRes = await fetch(
      `${data_Layer_Base_Api_Endpoint}/accounts/invites/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsedBody.email,
          description: parsedBody.description,
        }),
      }
    );

    if (invitationRequestRes.ok) {
      res.status(201).json({
        success: true,
        message: "Invitation sent to user email",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Could not send invitation. Please try again later.",
    });
  } catch (err) {
    console.log(`invitationRequestController encountered an err`, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};

export const verifyInvitationRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedBody = getInvitationDetailsValidator.parse(req.body);

    const data_Layer_Base_Api_Endpoint = get_Data_Layer_Base_Api_Endpoint();

    const getVerificationDetailsFromDb = await fetch(
      `${data_Layer_Base_Api_Endpoint}/accounts/invites/getInvite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_of_invited: parsedBody.email_of_invited,
          token: parsedBody.token,
          otp: parsedBody.otp,
        }),
      }
    );
    const response = await getVerificationDetailsFromDb.json();

    if (getVerificationDetailsFromDb.ok) {
      console.log(
        Date.now() <= response?.data.expiration,
        response?.data.token_type === TokenTypes.INVITATION
      );
      if (
        Date.now() <= response?.data.expiration &&
        response?.data.token_type === TokenTypes.INVITATION
      ) {
        res.status(200).json({
          verified: true,
          message: "user verified",
          is_token_expired: false,
        });

        return;
      } else {
        res.status(401).json({
          verified: false,
          message: "Could not verify user",
          is_token_expired: true,
        });
      }

      return;
    }

    res.status(401).json({
      verified: false,
      message: "Could not verify user",
      is_token_expired: false,
    });

    return;
  } catch (err) {
    console.log(`verifyInvitationRequestController encountered an err `, err);

    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Bad request",
        error: err.errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });

    return;
  }
};
