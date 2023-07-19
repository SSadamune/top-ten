import { QuestionCategory } from "../../../types";
import act_0 from "./act_0.png";
import act_1 from "./act_1.png";
import ippon_0 from "./ippon_0.png";
import ippon_1 from "./ippon_1.png";
import normal_0 from "./normal_0.png";
import normal_1 from "./normal_1.png";
import normal_2 from "./normal_2.png";
import normal_3 from "./normal_3.png";
import nsfw_0 from "./nsfw_0.png";

export const images: { [K in `${QuestionCategory}_${number}`]: string } = {
  act_0: act_0,
  act_1: act_1,
  ippon_0: ippon_0,
  ippon_1: ippon_1,
  normal_0: normal_0,
  normal_1: normal_1,
  normal_2: normal_2,
  normal_3: normal_3,
  nsfw_0: nsfw_0,
};
