import isReservedIP from "reserved-ip";

type linearIP = {
    o1: number,
    o2: number,
    o3: number,
    o4: number
}

export class ipGenerator
{
    static ip: string;
    static goodIp = false;
    static currentLinearIp: linearIP = { o1: 0, o2: 0, o3: 0, o4: 0 }
    static octetGen = octetGen();

    /**
     * Assigns a new IP
     * @param mode - is the IP generation mode
     */
    static assignIp(mode: "random" | "linear"): void
    {
        switch (mode)
        {
            case "random":
                this.ip = `${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}`;
                break;
            default:
                // FIXME: Fix the fuckery I wrote here so that it goes through every IP

                this.currentLinearIp = {
                    o1: this.currentLinearIp.o1 === 255 ? this.currentLinearIp.o1 = 0 : this.currentLinearIp.o1++,
                    o2: this.currentLinearIp.o2 === 255 ? this.currentLinearIp.o2 = 0 : this.currentLinearIp.o2++,
                    o3: this.currentLinearIp.o3 === 255 ? this.currentLinearIp.o3 = 0 : this.currentLinearIp.o3++,
                    o4: this.currentLinearIp.o4 === 255 ? this.currentLinearIp.o4 = 0 : this.currentLinearIp.o4++
                }
                this.ip = `${this.currentLinearIp.o1}.${this.currentLinearIp.o2}.${this.currentLinearIp.o3}.${this.currentLinearIp.o4}`
        }
    }

    /**
     *
     * @param mode - is the IP generation mode
     */
    static generator(mode: "random" | "linear"): string
    {
        this.assignIp(mode)

        while (!this.goodIp)
        {
            if (!isReservedIP(ipGenerator.ip))
                this.goodIp = true;
            else
                this.assignIp(mode)
        }

        return ipGenerator.ip
    }
}

export class portGenerator
{
    // TODO:
    //  Add random and linear port generation
    //  Check for reserved ports
}

/**
 * Generates octets to "bruteforce" IPs
 */
export function* octetGen()
{
    while (true)
        yield Math.floor(Math.random() * (255 + 1));
}

/**
 * Generates port numbers
 */
export function* portGen()
{
    while (true)
        yield Math.floor(Math.random() * (65535 - 1 + 1)) + 1;
}