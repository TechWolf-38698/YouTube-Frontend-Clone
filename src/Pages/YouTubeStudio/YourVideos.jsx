import React, { useEffect } from "react";

export const YourVideos = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Your Videos - YouTube";
  }, []);
  return (
    <>
      <div className="container-fluid">
        <h5 className="mb-4" style={{ fontWeight: 600 }}>
          Your Video
        </h5>
        <div className="row">
          <div className="col-12">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Video</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
