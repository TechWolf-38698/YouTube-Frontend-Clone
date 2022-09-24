import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { HomeCard, SubscriptionCard } from "../../components/SmallComponents";
// eslint-disable-next-line
import { baseUrl, contentUrl } from "../../Services/myAxios";
export const Subscriptions = () => {
  const user = useSelector((state) => state.LoggedInUser);
  // eslint-disable-next-line
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    document.getElementById("title").innerText = "Subscriptions - YouTube";
    if (user) {
      getData();
    }
  }, [user]);

  const getData = () => {
    setPageLoading(true);
    axios
      .get(`${baseUrl}/subs/getSubscriptions/${user._id}`)
      .then((res) => {
        console.log(res.data);
        setPageLoading(false);
        // res.data.sort((a, b) => {
        //   let da = new Date(a.date),
        //     db = new Date(b.date);
        //   return db - da;
        // });
        setData(res.data.reverse());
      })
      .catch((err) => {
        setPageLoading(false);
      });
  };

  return user ? (
    <>
      <div className="container">
        <h5 className="mb-4" style={{ fontWeight: 600 }}>
          Subscription
        </h5>
        {data.length !== 0 ? (
          <>
            {data.map((e, i) => (
              <SubscriptionCard
                channel={e.channel}
                user={user}
                subs={e.channel.subscribers}
                key={i}
              />
            ))}
            {/* <div className="row">
              {data.map((e, i) => (
                <HomeCard
                  channel={e.channel.f_name + " " + e.channel.l_name}
                  createdAt={e.date}
                  title={e.title}
                  url={`/youtube/watch?v=${e._id}`}
                  img={`${contentUrl}${e.thumbnailUrl}`}
                  views={e.views.length}
                  key={i}
                />
              ))}
            </div> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  ) : (
    <>
      <>
        <div
          className="col d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <h1 className="text-center text-muted">
            Please Login to see your Subscriptions
          </h1>
        </div>
      </>
    </>
  );
};
