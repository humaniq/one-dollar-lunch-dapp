import React from "react";
import "./styles.sass";
import { Avatar, Divider, Skeleton, styled } from "@mui/material";
import Clouds from "../../static/images/clouds.svg";
import Check from "../../static/images/check.svg";
import { renderShortAddress } from "utils/address";
import { observer } from "mobx-react";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export interface CryptoCardProps {
  fields?: Array<Array<string>>;
  name?: string;
  address?: string;
  verified?: boolean;
  photoUrl?: string;
  loading: boolean;
}

export const HumaniqIdCard: React.FC<CryptoCardProps> = observer(
  ({
    fields = [
      ["Date of birth", "..........."],
      ["Country", "..........."],
      ["City", "..........."],
    ],
    name = "User name",
    address,
    verified = false,
    photoUrl = "",
    loading = false,
  }) => {
    return (
      <div className={"card-container"}>
        <div className={"card"}>
          <div className={"title"}>Humaniq ID</div>
          <div className={"address"}>
            {verified && (
              <Avatar
                src={Check}
                sx={{
                  width: 14,
                  height: 14,
                  bgcolor: "white",
                  padding: "3px",
                }}
              />
            )}
            <span>
              {" "}
              {address ? renderShortAddress(address) : "..........."}{" "}
            </span>
          </div>
          <img className={"clouds"} src={Clouds} />
          {loading ? (
            <Skeleton variant="circular">
              <Avatar className={"avatar"} />
            </Skeleton>
          ) : (
            <Avatar variant={"circular"} className={"avatar"} src={photoUrl} />
          )}
          <div className={"name-container"}>
            <span className={"name"}>{name}</span>
          </div>
          <div className={"bottom"}></div>
        </div>
        <div className={"user-data"}>
          <Root>
            {fields &&
              fields.length > 0 &&
              fields.map((f, i) => {
                return (
                  <div key={i}>
                    <div className={"row"}>
                      <div className={"title"}>{f[0]}</div>
                      <div className={"value"}>{f[1] || "..........."}</div>
                    </div>
                    {i !== fields.length - 1 && <Divider />}
                  </div>
                );
              })}
          </Root>
        </div>
      </div>
    );
  }
);
