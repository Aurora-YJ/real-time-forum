export function showPost(repdata) {
  if (repdata.lenght == null) {
    return;
  }

  const allposts = document.getElementById("allposts");

  repdata.message.forEach((p) => {
    const onepost = document.createElement("div");
    onepost.setAttribute("class", "post");

    const userbar = document.createElement("div");
    userbar.setAttribute("class", "userbar");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "ulInUserbar");

    const imageandname = document.createElement("div");
    imageandname.setAttribute("class", "imageandname");

    const creatdate = document.createElement("li");
    creatdate.setAttribute("class", "creatdate");
    const dateObj = new Date(p.CreataAt);
    const datee = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    creatdate.innerHTML = `creat at: ${datee}`;

    const foricon = document.createElement("li");
    foricon.innerHTML = `<i class="fa-solid fa-user"></i>`;

    const forname = document.createElement("li");
    forname.innerHTML = `${p.Creator}`;

    imageandname.appendChild(foricon);
    imageandname.appendChild(forname);
    ul.appendChild(imageandname);
    ul.appendChild(creatdate);
    userbar.appendChild(ul);

    // for content
    const content = document.createElement("div");
    content.setAttribute("class", "content");

    const title = document.createElement("h3");
    title.innerHTML = `${p.Title}`;

    const description = document.createElement("p");
    description.innerHTML = `${p.Content}`;

    content.appendChild(title);
    content.appendChild(description);

    // catigoryandcomment

    const catyandcmt = document.createElement("div");
    catyandcmt.setAttribute("class", "catigoryandcomment");

    const category = document.createElement("div");
    category.setAttribute("class", "category");

    const pp = document.createElement("p");
    pp.innerHTML = `categorys: `;

    /* this for categorys*/

    /* end */

    const comment = document.createElement("div");
    comment.setAttribute("class", "comment");

    const spancmmt = document.createElement("span");
    spancmmt.innerHTML = `${p.CountComment}`;

    const btncmmt = document.createElement("button");
    btncmmt.innerHTML = `<i class="fa-solid fa-comments"></i>`;

    comment.appendChild(spancmmt);
    comment.appendChild(btncmmt);

    category.appendChild(pp);
    catyandcmt.appendChild(category);
    catyandcmt.appendChild(comment);

    onepost.appendChild(userbar);
    onepost.appendChild(content);
    onepost.appendChild(catyandcmt);
    allposts.appendChild(onepost);
  });
}
