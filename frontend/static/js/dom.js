export const registerdom = `
<div class="errorInRegOrLog" id="errorreglog"> 
  gggggffffffffffffff
</div> 
<div id="continer">
      <div class="registering">
 
        <input class="Nickname" type="text" name="Nickname"  placeholder="your Nickname..." required>
        <div class="firstandlastname">
            <input type="text" name="firstname" placeholder="your firstname..." required>
            <input type="text" name="lastname" placeholder="your lastname..." required>
        </div>
        <div class="genderandemail">
            <select name="gender" required>=
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="email" name="email" placeholder="your email..." required />
        </div>
        <input class="ageinput" type="text" name="age" placeholder="your age..." required />
        <div class="password">
            <input type="password" name="password" placeholder="your password..." required />
            <input type="password" name="confirm_password" placeholder="confirm_password..." required />
        </div>
        <input id="signup" class="signup" type="button" value="sign-up"/>
        <input id="signin" class="signin" value="change to sing-in"/>
      
      </div>
   </div>
`
export const logindom = `
<div class="errorInRegOrLog" id="errorreglog"> 
  gggggffffffffffffff
</div> 
 <div id="continer">
        <div class="registering">
          <input class="Nickname" type="text" name="Nicknameoremail"  placeholder="your Nickname or email.." required>
          <div class="passwordlog">
              <input type="password" name="password" placeholder="your password..." required />
              <input type="password" name="confirm_password" placeholder="confirm_password..." required />
          </div>
          <input id="signin" class="signin" type="button" value="sing-in"/>
          <input id="signup" class="signup" value="change to sign-up"/>
        </div>
    </div>
`
export const home = `
  <header>
        <div class="contentofthebar">
            <div class="title" > <a href="/">Wellcome</a></div>

            <div class="rightbar">  
                <div class="forhone">
                    <a href="/">
                        <i class="fa-solid fa-house"></i>
                        Home
                    </a>
                </div>
                <div class="forbuttons">
                        <button class="login" id="login">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            login
                        </button>
                        <button class="register" id="register">
                            <i class="fa-solid fa-user-plus"></i>
                            register
                        </button>
               
                </div>                
               
            </div>
        </div>
    </header>

    <main>
        
        <section>
            
            <p class="ppp">  <i class="fa-solid fa-bell"></i>you chats</p> 
            <div class="mesgfrom">
                <button>
                    <i class="fa-regular fa-message"></i>  youssef    
                </button>
            </div>
        </section>

        <article>
            <div class="creat-post">
            
                    <button id="AddPost" class="Add_Post" ><i class="fa-duotone fa-solid fa-plus fa-rotate-90"></i> Add_Post</button>
              
            </div>
            <div class="potess">
                <div class="post">
                   <div class="userbar">
                       <ul>
                            <div class="imageandname">
                                <li ><i class="fa-solid fa-user"></i></i></li>
                                <li >youssef</li>
                            </div>
                            <li class="creatdate"> creat at: 2000/02/01</li>
                       </ul>
                    </div>
                    <div class="content">
                        <h3>hello</h3>
                        <p>sdafyugfvoydusvhayoufdgzvyadhfvyuzdyuzsvhb
                            dyfvyuaGFEWYCAsdafyugfvoydusvhayoufdgzvyadhfvyuzdyu
                            zsvhbdyfvyuaGFEWYCAsdafyugfvoydusvhayoufdgzvyadhfvyuzdyuzsvhbdyfvyuaGFEWYCA</p>
                    </div>
                    <div class="catigoryandcomment">
                        <div class="category">
                            <p >categorys: <span style="color: red;">sport , code</span></p>
                        </div>
                        <div class="comment">
                            <span>2</span>   
                            <button>
                                <i class="fa-solid fa-comments"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </article>
    </main>

` 