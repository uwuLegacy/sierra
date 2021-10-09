-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "dsc_id" TEXT,
    "econ_accid" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL DEFAULT 0,
    "bank" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dsc_id_key" ON "User"("dsc_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_econ_accid_key" ON "User"("econ_accid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_econ_accid_fkey" FOREIGN KEY ("econ_accid") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
