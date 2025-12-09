import Link from "next/link";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className="bg-card py-8 border-t border-border no-print">
      <Wrapper className="px-4 ">
        <div className="w-full flex justify-center items-center text-center gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
                Church<span className="text-primary">Blog</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Encouraging devotionals, Bible studies, and spiritual insights for
              your daily walk with Christ. Subscribe to grow in faith.
            </p>
          </div>
          {/* 
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Latest Devotionals
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Bible Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sermon Notes
                </Link>
              </li>
            </ul>
          </div> */}

          {/* <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/signup"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>

            </ul>
          </div> */}
        </div>

        <div className="mt-8 pt-8 border-t border-border flex justify-center text-center items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}Church Blog. All rights reserved.
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
