import cors from "cors";

const CORSConfig = (app) => {
  const allowedOrigins = [];

  if (process.env.ALLOWED_ORIGINS) {
    const origins = process.env.ALLOWED_ORIGINS.split(";");
    origins.forEach((origin) => {
      allowedOrigins.push(origin);
    });
  } else {
    allowedOrigins.push("http://localhost:3000");
  }

  console.log(allowedOrigins);

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
