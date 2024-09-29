import { Dancestyle } from "./Dancestyle";

export interface Dancecategory {
  idcategd?: number;
  categdname?: string;
  categdesc?: string;
  cadddate?: Date;
  dancestyles?: Dancestyle[];
  showStyles: boolean;
}


