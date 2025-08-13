import { GetServerSideProps } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
      <Tabs defaultValue="login">
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AppWindowIcon className="h-5 w-5" />
                관리자 로그인
              </CardTitle>
              <CardDescription>
                관리자가 아닌 경우 문의 부탁드립니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <form 
                method="post"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                  const password = (form.elements.namedItem('password') as HTMLInputElement).value;

                  const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/' });
                  // NextAuth가 redirect 처리함
                }}
                className="space-y-4"
              >
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <div className="grid gap-3">
                  <Label htmlFor="signin-email">이메일</Label>
                  <Input 
                    id="signin-email" 
                    name="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    required 
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signin-password">비밀번호</Label>
                  <Input 
                    id="signin-password" 
                    name="password" 
                    type="password" 
                    placeholder="비밀번호를 입력하세요" 
                    required 
                  />
                </div>
                <CardFooter className="px-0 pb-0">
                  <Button type="submit" className="w-full">
                    로그인
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const csrfToken = await getCsrfToken(ctx);
  return { props: { csrfToken: csrfToken ?? '' } };
};