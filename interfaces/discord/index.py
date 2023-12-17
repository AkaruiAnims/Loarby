import discord
from discord import app_commands
from discord.ext import commands

bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())

@bot.event
async def on_ready():
    print('Loarby is ready.')


@bot.tree.command(name='sync', description='Owner only')
async def sync(interaction: discord.Interaction):
    if interaction.user.id == 200459701752692738:
        await bot.tree.sync()
        print('Command tree synced.')
    else:
        await interaction.response.send_message('You must be the owner to use this command!')


@bot.tree.command( name="ping", description="responds with pong") # !ping
async def ping( interaction: discord.Interaction ):
    await interaction.response.send_message('Pong!')

bot.run("OTc2OTg2NzQ1NDQ5MTExNTc0.GdjpHo.uLM781A9RBrw9QWhnzghc063aQS0h6ZR-k_6hc")