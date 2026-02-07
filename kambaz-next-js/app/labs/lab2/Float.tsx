export default function Float() {
  return (
    <div>
      <div id="wd-float-divs">
        <h2>Float</h2>
        <div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red
          </div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          <div className="wd-float-done"></div>
        </div>
      </div>

      <div id="wd-float-imgs">
        <h2>Float with images</h2>
        <div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
          temporibus quibusdam voluptates similique deleniti rerum laboriosam
          exercitationem facilis, repellendus unde animi asperiores quaerat
          cumque aspernatur blanditiis perspiciatis esse accusamus! Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Eius hic temporibus
          quibusdam voluptates similique deleniti rerum laboriosam exercitationem
          facilis, repellendus unde animi asperiores quaerat cumque aspernatur
          blanditiis perspiciatis esse accusamus!
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
          temporibus quibusdam voluptates similique deleniti rerum laboriosam
          exercitationem facilis, repellendus unde animi asperiores quaerat
          cumque aspernatur blanditiis perspiciatis esse accusamus! Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Eius hic temporibus
          quibusdam voluptates similique deleniti rerum laboriosam exercitationem
          facilis, repellendus unde animi asperiores quaerat cumque aspernatur
          blanditiis perspiciatis esse accusamus!
          <div className="wd-float-done"></div>
        </div>
      </div>
    </div>
  );
}
