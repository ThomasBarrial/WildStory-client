import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <div>
      <div className="flex w-full mt-1 lg:w-10/12  text-xs font-bold items-start">
        <p>Need a new account</p>
        <Link to="/signup">
          <button className="font-bold text-pink ml-2 underline" type="button">
            Signup
          </button>
        </Link>
      </div>
      <div className="text-xs w-full items-start flex  mt-10">
        <p>In collaboration with</p>
        <a
          href="https://www.wildcodeschool.com/fr-FR?utm_campaign=FR_SEARCH+-+Marque&utm_term=wild%20code%20school&utm_source=adwords&utm_medium=ppc&hsa_grp=130792156507&hsa_src=g&hsa_cam=14821000047&hsa_ad=595760405168&hsa_ver=3&hsa_kw=wild%20code%20school&hsa_net=adwords&hsa_tgt=kwd-440435778420&hsa_mt=p&hsa_acc=4421706736&gclid=CjwKCAjw6raYBhB7EiwABge5KoqJzfRTcoQ02x1HVRvmJ5PAP0lBGKkok8ffHi8sLj0JEfZGrTSIABoCq7YQAvD_BwE"
          target="_blank"
          rel="noreferrer"
          className="text-pink ml-2 underline"
        >
          @wildcodeschool
        </a>
      </div>
    </div>
  );
}

export default Footer;
