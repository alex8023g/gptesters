-- CreateTable
CREATE TABLE "InstalledApps" (
    "appId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InstalledApps_pkey" PRIMARY KEY ("appId","userId")
);

-- AddForeignKey
ALTER TABLE "InstalledApps" ADD CONSTRAINT "InstalledApps_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstalledApps" ADD CONSTRAINT "InstalledApps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
