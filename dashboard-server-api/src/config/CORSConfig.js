import cors from "cors";

const ip = process.env.DEV_IP || "localhost";

const CORSConfig = (app) => {
  const allowedOrigins = [`http://${ip}:3000`, `http://localhost:3000`, "*"];

  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
};

export default CORSConfig;
