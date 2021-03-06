create or replace package mtl_auth_pkg
as
  /**
  * Project:         Multiplication Table
  * Author:          APEX RnD - Dimitri Gielis
  * Description:     Custom Authentication and Authorization
  * Note:            None
  * @headcom
  */


  /**
  * Create account
  *
  * @param p_username  username
  * @param p_password  password
  */
  procedure create_account(
      p_email    in varchar2,
      p_password in varchar2
  );


  /**
  * Custom authenticate
  *
  * @param p_username  username
  * @param p_password  password
  */
  function custom_authenticate(
      p_username in varchar2,
      p_password in varchar2)
    return boolean;


  /**
  * Post authenticate
  *
  * @param p_username  
  * @param out_user_id  
  * @param out_first_name  
  */
  procedure post_authenticate(
      p_username in varchar2,
      out_user_id out number,
      out_time_zone out varchar2) ;


  /**
  * Request reset password
  *
  * @param p_email 
  */
  procedure request_reset_password(
      p_email in varchar2) ;


  /**
  * Verify reeset password
  *
  * verify the token of the password request and retun the id of the user
  *
  * @param p_token 
  */
  function verify_reset_password(
      p_id                in number,
      p_verification_code in varchar2)
    return number;


  /**
  * Reset password
  *
  * @param p_id       
  * @param p_password 
  */
  procedure reset_password(
      p_id       in number,
      p_password in varchar2) ;


  /**
  * Authorization: administrator
  *
  * @param p_username  username
  */
  function authz_administrator(
      p_username in varchar2)
    return boolean;


  /**
  * Authorization: registered user
  *
  * @param p_username  username
  */
  function authz_user(
      p_username in varchar2)
    return boolean;


end mtl_auth_pkg;
